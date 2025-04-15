module.exports = {
    content: ["./src/widget.js"], // correct
    safelist: [
      // Layout
      "fixed", "bottom-4", "right-4", "z-[9999]", "flex", "flex-col", "flex-wrap", "flex-1",
      "items-center", "items-end", "justify-between", "justify-end", "self-start",
      "w-16", "h-16", "w-[90vw]", "max-w-md", "sm:w-96", "sm:h-[600px]", "overflow-hidden", "overflow-y-auto",
      "rounded-full", "rounded-br-none", "rounded-bl-none", "rounded-2xl",
      "shadow-lg", "shadow-xl", "border", "border-t", "border-b", "border-gray-200",
  
      // Typography
      "text-sm", "text-left", "text-right", "font-sans", "font-semibold", "text-gray-400", "hover:text-gray-600",
  
      // Spacing
      "p-0", "px-4", "py-2", "px-3", "py-[6px]", "gap-2", "gap-1",
  
      // Transitions
      "transition", "transition-all", "duration-300", "ease-in-out", "transform",
      "scale-95", "scale-100", "hover:scale-110", "opacity-0", "opacity-100",
  
      // Input
      "resize-none", "leading-tight", "min-h-[36px]", "max-h-[90px]", "focus:outline-none", "focus:ring-2",
  
      // Utilities
      "bg-white", "bg-transparent", "bg-[#f9fafb]", "text-[#3539f2]",
      "break-words", "whitespace-pre-wrap"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  