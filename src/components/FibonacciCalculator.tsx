'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, CodeIcon, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Pre-computed Fibonacci numbers for quick access
const initialMemo: Record<number, bigint> = {
  0: 0n,
  1: 1n,
  2: 1n,
  3: 2n,
  4: 3n,
  5: 5n,
  6: 8n,
  7: 13n,
  8: 21n,
  9: 34n,
  10: 55n
};

const CodeExplanation = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      <Collapsible>
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
                <span className="text-slate-400">Kyle Yuan Uy</span>
                <span>&</span>
                <span className="text-slate-400">Diofel Gwen Haresco</span>
              </div>
              <div className="text-slate-400">BSCS 2-B</div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default function FibonacciCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [isResultVisible, setIsResultVisible] = useState(false);

  // Memoized fibonacci function
  const calculateFibonacci = useMemo(() => {
    const memo: Record<number, bigint> = { ...initialMemo };
    
    const fib = (n: number): bigint => {
      if (n in memo) return memo[n];
      memo[n] = fib(n - 1) + fib(n - 2);
      return memo[n];
    };
    
    return fib;
  }, []);

  const handleCalculate = () => {
    const n = parseInt(input);
    setError('');
    setIsResultVisible(false);
    
    if (isNaN(n)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (n < 0) {
      setError('Please enter a non-negative number');
      return;
    }

    setIsCalculating(true);
    // Use setTimeout to allow loading animation to show
    setTimeout(() => {
      try {
        const fibResult = calculateFibonacci(n);
        setResult(fibResult.toString());
        setIsResultVisible(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('An error occurred during calculation');
      }
      setIsCalculating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl bg-slate-950 border-slate-800 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-500/10">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Fibonacci Calculator
          </CardTitle>
          <p className="text-slate-400 animate-slide-up">
            Enter a number to find its Fibonacci value
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex space-x-2 animate-slide-up">
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a non-negative integer"
              className="text-lg bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
              min="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCalculate();
              }}
            />
            <Button 
              onClick={handleCalculate}
              className={`bg-blue-600 hover:bg-blue-500 text-white px-6 transition-all duration-300 ${
                isCalculating ? 'animate-pulse' : ''
              }`}
              disabled={isCalculating}
            >
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </Button>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 animate-shake">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {result !== null && !error && (
            <div 
              className={`p-4 bg-slate-900 rounded-lg border border-slate-700 transition-all duration-500 ease-out ${
                isResultVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
              }`}
            >
              <p className="text-sm text-blue-400 mb-1">Result:</p>
              <p className="text-xl font-mono break-all text-slate-100">{result}</p>
            </div>
          )}

          <div className="text-sm text-slate-400 mt-4 space-y-2 animate-fade-in">
            <p>This calculator uses recursion with memoization for efficient computation.</p>
            <p>The first 10 Fibonacci numbers are pre-computed for instant results.</p>
          </div>

          <CodeExplanation />
        </CardContent>
      </Card>
    </div>
  );
}