
import React from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PredictionData {
  symbol: string;
  prediction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  targetPrice: number;
  currentPrice: number;
  timeframe: string;
  factors: string[];
}

interface PredictivePanelProps {
  predictions: PredictionData[];
}

export const PredictivePanel: React.FC<PredictivePanelProps> = ({ predictions }) => {
  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-summit-green" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-summit-red" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-summit-yellow" />;
    }
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'bullish':
        return 'text-summit-green';
      case 'bearish':
        return 'text-summit-red';
      default:
        return 'text-summit-yellow';
    }
  };

  const getProgressColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-summit-green';
    if (confidence >= 60) return 'bg-summit-yellow';
    return 'bg-summit-red';
  };

  return (
    <Card className="glass-effect hover-glow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-summit-purple/20 rounded-lg">
          <Brain className="w-6 h-6 text-summit-purple" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">AI Predictions</h3>
          <p className="text-sm text-gray-400">Machine Learning Forecasts</p>
        </div>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="p-4 bg-summit-gray/50 rounded-lg border border-summit-light-gray/30">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                {getPredictionIcon(prediction.prediction)}
                <div>
                  <h4 className="font-bold text-white">{prediction.symbol}</h4>
                  <p className={`text-sm font-medium ${getPredictionColor(prediction.prediction)}`}>
                    {prediction.prediction.toUpperCase()} - {prediction.timeframe}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  ${prediction.targetPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">
                  Current: ${prediction.currentPrice.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Confidence</span>
                <span className="text-sm font-medium text-white">{prediction.confidence}%</span>
              </div>
              <Progress 
                value={prediction.confidence} 
                className="h-2"
                // Custom styling for the progress bar color based on confidence
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-400">Key Factors:</p>
              <div className="flex flex-wrap gap-1">
                {prediction.factors.map((factor, factorIndex) => (
                  <span 
                    key={factorIndex}
                    className="px-2 py-1 bg-summit-blue/20 text-summit-blue text-xs rounded-full"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
