import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CodeIcon, ChevronDown, ChevronUp } from 'lucide-react';

const CodeExplanation = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const codeExplanations = [
    {
      code: "const memo: Record<number, bigint> = { ...initialMemo };",
      explanation: "Creates a storage box to remember previously calculated numbers",
      highlight: "text-blue-400"
    },
    {
      code: "const fib = (n: number): bigint => {",
      explanation: "Sets up a function that finds the nth Fibonacci number",
      highlight: "text-purple-400"
    },
    {
      code: "  if (n in memo) return memo[n];",
      explanation: "If we've already calculated this number before, use the stored result",
      highlight: "text-yellow-400"
    },
    {
      code: "  memo[n] = fib(n - 1) + fib(n - 2);",
      explanation: "Calculates the new number by adding the two previous Fibonacci numbers",
      highlight: "text-green-400"
    },
    {
      code: "  return memo[n];",
      explanation: "Returns the calculated number and remembers it for future use",
      highlight: "text-orange-400"
    }
  ];

  return (
    <div className="mt-6 border-t border-slate-800 pt-4">
      <CollapsibleTrigger
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-slate-400 hover:text-slate-300 transition-colors duration-200 w-full"
      >
        <div className="flex items-center space-x-2 flex-1">
          <CodeIcon size={18} />
          <span>View Implementation</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="mt-4 bg-slate-900 rounded-lg p-4 border border-slate-800">
          <div className="space-y-3">
            {codeExplanations.map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-mono text-sm py-1 px-2 rounded hover:bg-slate-800 transition-colors duration-200 cursor-help">
                      <span className={item.highlight}>{item.code}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="max-w-sm bg-slate-800 border-slate-700"
                  >
                    <div className="p-2">
                      <p className="text-sm text-slate-200">{item.explanation}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <span>by</span>
              <span className="text-slate-400">Kyle YUan Uy</span>
              <span>&</span>
              <span className="text-slate-400">Diofel Gwen Haresco</span>
            </div>
            <div className="text-slate-400">BSCS 2-B</div>
          </div>
        </div>
      </CollapsibleContent>
    </div>
  );
};

export default CodeExplanation;