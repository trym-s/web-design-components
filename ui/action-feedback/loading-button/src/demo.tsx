"use client";

import { LoadingButton } from "./loading-button";

function publish() {
  return new Promise((resolve) => setTimeout(resolve, 1600));
}

export default function LoadingButtonDemo() {
  return (
    <div className="flex justify-center">
      <LoadingButton onAction={publish} successLabel="Published">
        Publish
      </LoadingButton>
    </div>
  );
}
