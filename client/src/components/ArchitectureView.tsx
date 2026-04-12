import { motion } from "framer-motion";
import { Database, Layers, Zap, Brain, ArrowRight } from "lucide-react";

export function ArchitectureView() {
  const stages = [
    {
      title: "Input Data",
      description: "RGB | 5 MS bands | 30 HS bands",
      icon: Database,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Dataset & Preprocessing",
      description: "Resize, normalize, augmentation using Hugging Face datasets API",
      icon: Layers,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "3D Spectral-Spatial Convolution",
      description: "3D convolutions from cube joint feature extraction in competa",
      icon: Brain,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "2D Spatial Refinement CNN",
      description: "2D Convolutions, refine project into 2D space cube",
      icon: Zap,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Cross-Level Feature Fusion",
      description: "Merge low- and high-level features merge convolution cube and high-level feature",
      icon: Layers,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Softmax & Classification",
      description: "Fully Connected Layers + Softmax Classifier",
      icon: Brain,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Output",
      description: "Predicted Flower Species + Phytochemical Inference + Geo-Distribution",
      icon: ArrowRight,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-5xl lg:text-6xl font-extrabold text-white mb-4"
          >
            HSSAN Architecture
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Hybrid Spectral-Spatial Attention Network for Advanced Flower Classification
          </p>
        </motion.div>

        {/* Architecture Pipeline */}
        <div className="space-y-6 mb-16">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < stages.length - 1 && (
                  <div className="absolute left-12 top-24 h-12 w-1 bg-gradient-to-b from-slate-500 to-transparent" />
                )}

                {/* Stage Card */}
                <div className="flex gap-6 items-start">
                  {/* Icon Circle */}
                  <div className={`flex-shrink-0 relative`}>
                    <div
                      className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {/* Stage Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-500 transition-all">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Architecture Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-blue-300 font-bold mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              SE Channel Attention
            </h4>
            <p className="text-slate-300 text-sm">
              Squeeze excitation with adaptive channel recalibration to adorn and promote channel features
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Multi-Modal Processing
            </h4>
            <p className="text-slate-300 text-sm">
              Processes RGB, 5 multispectral bands, and 30 hyperspectral bands simultaneously
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="text-green-300 font-bold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Output Metrics
            </h4>
            <p className="text-slate-300 text-sm">
              Class Label + Functional Insights + Phytochemical & Geographic Inference
            </p>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Key Architecture Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "3D Spectral-Spatial Feature Extraction",
              "SE Channel Attention Mechanism",
              "Cross-Level Feature Fusion",
              "Multi-Modal Input Processing (RGB + MS + HS)",
              "Softmax Confidence Scoring",
              "Botanical Information Enrichment",
              "Geographic Distribution Inference",
              "Phytochemical Compound Detection",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
