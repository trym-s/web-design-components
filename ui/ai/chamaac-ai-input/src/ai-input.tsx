/**
 * AI Input — Chamaac UI `registry/chamaac/ai-input/ai-input.tsx` (commit 345d79b) without Next.js. The simulated AI
 * reply is gone: the conversation is a `messages` prop the host fills (uncontrolled, it only records what the user
 * sends), and the mic toggle reports through `onListeningChange`.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { createContext, useContext, useEffect, useRef, useState, type ChangeEvent, type ComponentType, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domMax, m } from "motion/react";
import {
  Mic,
  ArrowUp,
  Sparkles,
  ChevronDown,
  X,
  Plus,
  Check,
  Globe,
  Video,
  Image as ImageIcon,
  Layout,
  BookOpen,
  Paperclip,
  File,
  Square,
  type LucideIcon,
} from "lucide-react";
import { cn } from "./lib/utils";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type IconComponent = ComponentType<{ className?: string }>;

interface AIInputContextType {
  activeDropdown: "plus" | "tools" | "model" | null;
  setActiveDropdown: (dropdown: "plus" | "tools" | "model" | null) => void;
}

export interface Model {
  id: string;
  name: string;
  label: string;
  icon: LucideIcon;
}

export interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

export interface ToolItem {
  icon: LucideIcon;
  label: string;
}

export interface Attachment {
  preview: string;
  type: "image" | "file" | "video";
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  attachments?: Attachment[];
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "file" | "video";
}

// =============================================================================
// CONSTANTS & DEFAULTS
// =============================================================================

const DEFAULT_MODELS: Model[] = [
  { id: "gpt4o", name: "GPT-4o", label: "GPT-4o", icon: Sparkles },
  { id: "gpt4", name: "GPT-4", label: "GPT-4", icon: Sparkles },
  { id: "claude", name: "Claude 3.5", label: "Claude 3.5", icon: Sparkles },
  {
    id: "claude-opus",
    name: "Claude 4.5 Opus",
    label: "Claude 4.5 Opus",
    icon: Sparkles,
  },
];

const DEFAULT_PLUS_MENU: MenuItem[] = [
  { id: "files", icon: Paperclip, label: "Upload photos & files" },
  { id: "videos", icon: Video, label: "Upload Videos" },
];

const DEFAULT_TOOLS: ToolItem[] = [
  { icon: Globe, label: "Deep Research" },
  { icon: Video, label: "Create videos" },
  { icon: ImageIcon, label: "Create images" },
  { icon: Layout, label: "Canvas" },
  { icon: BookOpen, label: "Guided Learning" },
];

// =============================================================================
// CONTEXT
// =============================================================================

const AIInputContext = createContext<AIInputContextType | undefined>(undefined);

export const useAIInput = () => {
  const context = useContext(AIInputContext);
  if (!context) {
    throw new Error("useAIInput must be used within an AIInput component");
  }
  return context;
};

// =============================================================================
// DROPDOWN COMPONENT
// =============================================================================

interface DropdownItem {
  icon?: IconComponent;
  label: string;
  onClick?: () => void;
}

interface AIInputDropdownProps<T> {
  isOpen: boolean;
  onClose: () => void;
  items: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  className?: string;
}

export function AIInputDropdown<T extends DropdownItem>({
  isOpen,
  onClose,
  items,
  renderItem,
  className,
}: AIInputDropdownProps<T>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            role="button"
            tabIndex={-1}
            aria-label="Dismiss"
            className="fixed inset-0 z-40 bg-transparent"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
          />
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className={cn(
              "absolute bottom-full left-0 mb-2 bg-popover text-popover-foreground border border-border rounded-2xl shadow-xl overflow-hidden z-50 p-1.5",
              className
            )}
          >
            <div className="flex flex-col gap-0.5">
              {items.map((item, index) =>
                renderItem ? (
                  <div key={item.label} role="presentation" onClick={onClose}>
                    {renderItem(item, index)}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick?.();
                      onClose();
                    }}
                    className="flex items-center gap-2 px-2 py-2.5 w-full text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl transition-colors group"
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                )
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
AIInputDropdown.displayName = "AIInputDropdown";

// =============================================================================
// PILL BUTTON COMPONENT
// =============================================================================

interface AIInputPillButtonProps {
  children: ReactNode;
  isActive?: boolean;
  showChevron?: boolean;
  chevronRotated?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  layoutId?: string;
  className?: string;
  icon?: IconComponent;
}

export function AIInputPillButton({
  children,
  isActive = false,
  showChevron = false,
  chevronRotated = false,
  showClose = false,
  onClose,
  onClick,
  layoutId,
  className,
  icon: Icon,
}: AIInputPillButtonProps) {
  const baseStyles =
    "flex items-center gap-2 px-3 py-2 rounded-full transition-colors border cursor-pointer";
  const activeStyles =
    "bg-accent text-accent-foreground border-foreground/10";
  const inactiveStyles =
    "bg-muted/50 text-muted-foreground hover:bg-accent border-foreground/5";

  const pillContent = (
    <>
      {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
      {children}
      {showChevron && (
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            chevronRotated && "rotate-180"
          )}
        />
      )}
    </>
  );

  if (showClose) {
    return (
      <m.div
        layoutId={layoutId}
        layout
        transition={{ duration: 0.3 }}
        className={cn(
          baseStyles,
          isActive ? activeStyles : inactiveStyles,
          className
        )}
      >
        <button
          onClick={onClick}
          className="flex items-center gap-2 cursor-pointer"
        >
          {pillContent}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="ml-1 p-0.5 rounded-full bg-muted text-muted-foreground flex items-center justify-center transition-colors hover:bg-foreground/15 cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      </m.div>
    );
  }

  return (
    <m.button
      layoutId={layoutId}
      layout
      onClick={onClick}
      transition={{ duration: 0.3 }}
      className={cn(
        baseStyles,
        isActive ? activeStyles : inactiveStyles,
        className
      )}
    >
      {pillContent}
    </m.button>
  );
}
AIInputPillButton.displayName = "AIInputPillButton";

// =============================================================================
// MESSAGES AREA COMPONENT
// =============================================================================

interface AIInputMessagesProps {
  messages: Message[];
  hasSubmitted: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function AIInputMessages({
  messages,
  hasSubmitted,
  messagesEndRef,
}: AIInputMessagesProps) {
  return (
    <m.div
      layout
      className={cn(
        "w-full max-w-2xl mx-auto flex flex-col gap-6 overflow-y-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        hasSubmitted ? "flex-1 pt-10" : "hidden"
      )}
    >
      {hasSubmitted && (
        <>
          {messages.map((msg) => (
            <m.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={msg.id}
              className={cn(
                "flex flex-col gap-2 max-w-[85%]",
                msg.role === "user" ? "ml-auto items-end" : "items-start"
              )}
            >
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {msg.attachments.map((attachment, attachIdx) => (
                    <div key={attachIdx} className="relative">
                      {attachment.type === "image" ? (
                        <div className="relative w-20 h-20 rounded-[12px] overflow-hidden border border-border">
                          <img src={attachment.preview} alt="Attachment" className="absolute inset-0 size-full object-cover" />
                        </div>
                      ) : attachment.type === "video" ? (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted border border-border">
                          <video
                            src={attachment.preview}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-muted border border-border flex items-center justify-center">
                          <File className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {msg.content && (
                <div
                  className={cn(
                    "p-2 rounded-[12px]",
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground"
                  )}
                >
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground">
                      <Sparkles className="w-3 h-3" />
                      AI Response
                    </div>
                  )}
                  {msg.content}
                </div>
              )}
            </m.div>
          ))}
          <div className="h-24 flex-shrink-0" />
          <div ref={messagesEndRef} />
        </>
      )}
    </m.div>
  );
}
AIInputMessages.displayName = "AIInputMessages";

// =============================================================================
// FILE PREVIEW COMPONENT
// =============================================================================

interface AIInputFilePreviewProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

export function AIInputFilePreview({
  files,
  onRemove,
}: AIInputFilePreviewProps) {
  return (
    <AnimatePresence>
      {files.length > 0 && (
        <m.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            transition: { ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          className="overflow-hidden"
        >
          <div className="px-4 pt-4 pb-2 flex flex-wrap gap-2">
            {files.map((file) => (
              <m.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                className="relative group/file"
              >
                {file.type === "image" ? (
                  <div className="relative w-16 h-16 rounded-[12px] overflow-hidden border border-border">
                    <img src={file.preview} alt={file.file.name} className="absolute inset-0 size-full object-cover" />
                  </div>
                ) : file.type === "video" ? (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                    <video
                      src={file.preview}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg border border-border bg-muted flex flex-col items-center justify-center gap-1 p-1">
                    <File className="w-5 h-5 text-muted-foreground" />
                    <span className="text-[8px] text-muted-foreground truncate w-full text-center">
                      {file.file.name.split(".").pop()?.toUpperCase()}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => onRemove(file.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-muted text-muted-foreground flex items-center justify-center border border-border cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </m.div>
            ))}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
AIInputFilePreview.displayName = "AIInputFilePreview";

// =============================================================================
// MAIN AI INPUT COMPONENT
// =============================================================================

export interface AIInputProps {
  models?: Model[];
  tools?: ToolItem[];
  /** Plus-menu entries; ids `files` and `videos` open the file pickers. */
  plusMenuItems?: MenuItem[];
  /** Conversation to show above the input (controlled). Omit it and the component records only what the user sends. */
  messages?: Message[];
  /** Called on Enter or the send button with the text and the attached files (object-URL previews). */
  onSubmit?: (message: string, attachments: Attachment[]) => void;
  /** Called when the mic button toggles listening; the host runs the speech capture. */
  onListeningChange?: (listening: boolean) => void;
  placeholder?: string;
  className?: string;
}

export function AIInput({
  models = DEFAULT_MODELS,
  tools = DEFAULT_TOOLS,
  plusMenuItems = DEFAULT_PLUS_MENU,
  messages: controlledMessages,
  onSubmit,
  onListeningChange,
  placeholder = "Ask anything...",
  className,
}: AIInputProps) {
  const [value, setValue] = useState<string>("");
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);
  const messages = controlledMessages ?? ownMessages;
  const hasSubmitted = messages.length > 0;
  const [isListening, setIsListening] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<
    "plus" | "tools" | "model" | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasText = value.length > 0;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: isImage || isVideo ? URL.createObjectURL(file) : "",
        type: isVideo ? "video" : isImage ? "image" : "file",
      };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handlePlusMenuClick = (itemId: string) => {
    setActiveDropdown(null);
    if (itemId === "files") fileInputRef.current?.click();
    else if (itemId === "videos") videoInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!value.trim() && uploadedFiles.length === 0) return;
    const attachments = uploadedFiles.map((file) => ({ preview: file.preview, type: file.type }));
    if (!controlledMessages) {
      setOwnMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, role: "user", content: value, attachments: attachments.length > 0 ? attachments : undefined },
      ]);
    }
    onSubmit?.(value, attachments);
    setValue("");
    setUploadedFiles([]);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    onListeningChange?.(!isListening);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
      <AIInputContext.Provider value={{ activeDropdown, setActiveDropdown }}>
        <div
          className={cn(
            "w-full h-[100dvh] flex flex-col relative overflow-hidden",
            className
          )}
        >
          <AIInputMessages
            messages={messages}
            hasSubmitted={hasSubmitted}
            messagesEndRef={messagesEndRef}
          />

          <m.div
            layout
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "w-full px-4 flex flex-col z-20",
              hasSubmitted ? "pb-8" : "flex-1 justify-center items-center"
            )}
          >
            <div className="w-full max-w-2xl mx-auto relative group">
              <m.div
                layoutId="input-container"
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative bg-background rounded-[32px] border border-foreground/5"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  multiple
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <AIInputFilePreview
                  files={uploadedFiles}
                  onRemove={removeFile}
                />

                <div className="p-4 pb-14">
                  <m.textarea
                    layout
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isListening}
                    placeholder={isListening ? "Listening..." : placeholder}
                    className="w-full bg-transparent text-lg text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[40px] max-h-[200px]"
                    rows={1}
                    style={{ minHeight: "44px", height: "auto" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                  {/* Left Side */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === "plus" ? null : "plus"
                          )
                        }
                        className={cn(
                          "p-2.5 rounded-full transition-colors border",
                          activeDropdown === "plus"
                            ? "bg-accent text-accent-foreground border-foreground/10"
                            : "bg-muted/50 text-muted-foreground hover:bg-accent border-foreground/5"
                        )}
                      >
                        <Plus
                          className={cn(
                            "w-5 h-5 transition-transform",
                            activeDropdown === "plus" && "rotate-45"
                          )}
                        />
                      </button>
                      <AIInputDropdown
                        isOpen={activeDropdown === "plus"}
                        onClose={() => setActiveDropdown(null)}
                        items={plusMenuItems}
                        className="w-56 bottom-full left-0 mb-2"
                        renderItem={(item) => (
                          <button
                            onClick={() => handlePlusMenuClick(item.id)}
                            className="flex items-center gap-2 px-4 py-3 w-full text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl transition-colors group"
                          >
                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </button>
                        )}
                      />
                    </div>

                    <div className="relative hidden sm:block">
                      {selectedTool ? (
                        <AIInputPillButton
                          layoutId="tools-pill"
                          icon={selectedTool.icon}
                          isActive={activeDropdown === "tools"}
                          showChevron
                          chevronRotated={activeDropdown === "tools"}
                          showClose
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === "tools" ? null : "tools"
                            )
                          }
                          onClose={() => {
                            setSelectedTool(null);
                            setActiveDropdown(null);
                          }}
                        >
                          <span className="text-sm font-medium">
                            {selectedTool.label}
                          </span>
                        </AIInputPillButton>
                      ) : (
                        <AIInputPillButton
                          layoutId="tools-pill"
                          icon={Sparkles}
                          isActive={activeDropdown === "tools"}
                          showChevron
                          chevronRotated={activeDropdown === "tools"}
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === "tools" ? null : "tools"
                            )
                          }
                        >
                          <span className="text-sm font-medium">Tools</span>
                        </AIInputPillButton>
                      )}

                      <AIInputDropdown
                        isOpen={activeDropdown === "tools"}
                        onClose={() => setActiveDropdown(null)}
                        items={tools}
                        className="w-64 bottom-full left-0 mb-2"
                        renderItem={(item) => (
                          <button
                            onClick={() => {
                              setSelectedTool(item);
                              setActiveDropdown(null);
                            }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 w-full text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl transition-colors group",
                              selectedTool?.label === item.label &&
                                "bg-accent text-accent-foreground"
                            )}
                          >
                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </button>
                        )}
                      />
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <AIInputPillButton
                        layoutId="model-pill"
                        icon={selectedModel.icon}
                        isActive={activeDropdown === "model"}
                        showChevron
                        chevronRotated={activeDropdown === "model"}
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === "model" ? null : "model"
                          )
                        }
                      >
                        <span className="text-sm font-medium">
                          {selectedModel.name}
                        </span>
                      </AIInputPillButton>

                      <AIInputDropdown
                        isOpen={activeDropdown === "model"}
                        onClose={() => setActiveDropdown(null)}
                        items={models}
                        className="w-48 bottom-full right-0 mb-2 p-1"
                        renderItem={(model) => (
                          <button
                            onClick={() => {
                              setSelectedModel(model);
                              setActiveDropdown(null);
                            }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 w-full text-left text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-2xl transition-colors group",
                              selectedModel.id === model.id &&
                                "bg-accent text-accent-foreground"
                            )}
                          >
                            <model.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                            <span className="text-sm font-medium">
                              {model.name}
                            </span>
                            {selectedModel.id === model.id && (
                              <Check className="w-4 h-4 ml-auto text-muted-foreground" />
                            )}
                          </button>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <AnimatePresence mode="wait" initial={false}>
                        {hasText ? (
                          <m.div
                            key="active-controls"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2"
                          >
                            <button
                              onClick={() => setValue("")}
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleSubmit}
                              className="p-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                            >
                              <ArrowUp className="w-5 h-5" />
                            </button>
                          </m.div>
                        ) : (
                          <m.div
                            key="inactive-controls"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2"
                          >
                            <button
                              onClick={toggleListening}
                              aria-pressed={isListening}
                              aria-label={isListening ? "Stop listening" : "Voice input"}
                              className={cn(
                                "p-2 transition-all duration-300 relative cursor-pointer",
                                isListening
                                  ? "text-destructive bg-destructive/10 rounded-full"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {isListening ? (
                                <Square
                                  className="w-4 h-4"
                                  fill="currentColor"
                                />
                              ) : (
                                <Mic className="w-4 h-4" />
                              )}
                              {isListening && (
                                <span className="absolute inset-0 rounded-full animate-ping bg-destructive/20 motion-reduce:animate-none" />
                              )}
                            </button>
                            <button
                              disabled
                              className="p-2.5 rounded-full bg-muted text-muted-foreground/50"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
      </AIInputContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
AIInput.displayName = "AIInput";

export default AIInput;
