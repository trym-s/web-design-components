import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Modal } from "./modal";

const EASE = [0.23, 1, 0.32, 1] as const;

export default function ModalDemo() {
  const [open, setOpen] = useState(true);
  const [working, setWorking] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const confirm = () => {
    setWorking(true);
    timers.current.push(
      setTimeout(() => {
        setWorking(false);
        setOpen(false);
      }, 900),
    );
  };

  return (
    <div className="grid w-full place-items-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-border bg-card shadow-xs transition-[transform,background-color] duration-150 hover:bg-accent active:translate-y-px h-9 rounded-[calc(var(--radius)-1px)] px-3.5 text-[13px] font-medium text-foreground"
      >
        Delete project
      </button>

      <Modal
        open={open}
        onClose={() => (working ? undefined : setOpen(false))}
        initialFocusRef={cancelRef}
        closeOnBackdrop={!working}
        closeOnEscape={!working}
        title="Delete atlas-edge?"
        description="This removes the project, its deployments and its domains. It cannot be undone."
        footer={
          <>
            <button
              ref={cancelRef}
              type="button"
              onClick={() => setOpen(false)}
              className="h-8 rounded-[calc(var(--radius)-2px)] border border-border px-3 text-[12.5px] font-medium text-foreground outline-none transition-colors duration-150 hover:bg-accent focus-visible:border-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirm}
              className="grid h-8 place-items-center rounded-[calc(var(--radius)-2px)] bg-primary px-3 text-[12.5px] font-medium text-primary-foreground outline-none transition-colors duration-150 hover:bg-primary/90 focus-visible:shadow-[inset_0_0_0_1px_var(--ring)]"
            >
              <span aria-hidden className="invisible col-start-1 row-start-1">
                Deleting
              </span>
              <motion.span
                aria-hidden
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: working ? 0 : 1 }}
                transition={{ duration: 0.16, ease: EASE }}
              >
                Delete
              </motion.span>
              <motion.span
                aria-hidden
                className="col-start-1 row-start-1"
                initial={false}
                animate={{ opacity: working ? 1 : 0 }}
                transition={{ duration: 0.16, ease: EASE }}
              >
                Deleting
              </motion.span>
              <span className="sr-only">{working ? "Deleting" : "Delete"}</span>
            </button>
          </>
        }
      >
        <p className="text-muted-foreground">
          Four deployments and one custom domain are attached.
        </p>
      </Modal>
    </div>
  );
}
