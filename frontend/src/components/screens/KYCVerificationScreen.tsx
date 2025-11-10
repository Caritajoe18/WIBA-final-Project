import { useState } from 'react';
import { type Screen } from '../../App';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Wallet, Upload, CheckCircle, Camera, ArrowLeft } from 'lucide-react';

interface KYCVerificationScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function KYCVerificationScreen({ onNavigate }: KYCVerificationScreenProps) {
  const [step, setStep] = useState<'wallet' | 'documents' | 'processing'>('wallet');
  const [, setWalletConnected] = useState(false);
  const [, setDocumentsUploaded] = useState(false);

  const handleConnectWallet = () => {
    setWalletConnected(true);
    setTimeout(() => setStep('documents'), 500);
  };

  const handleUploadDocuments = () => {
    setDocumentsUploaded(true);
    setStep('processing');
    setTimeout(() => onNavigate('home'), 2000);
  };

  const getProgress = () => {
    if (step === 'wallet') return 33;
    if (step === 'documents') return 66;
    return 100;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white px-6 lg:px-12 py-4 lg:py-6 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => onNavigate('welcome')} className="mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6 lg:w-7 lg:h-7 text-slate-700" />
          </button>
          <h2 className="text-blue-900 mb-2 text-xl lg:text-3xl font-bold">Verification</h2>
          <Progress value={getProgress()} className="h-2 lg:h-3" />
          <p className="text-slate-500 mt-2 text-sm lg:text-base">Step {step === 'wallet' ? '1' : step === 'documents' ? '2' : '3'} of 3</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 lg:p-12">
        <div className="max-w-2xl mx-auto">
          {/* Wallet Connection */}
          {step === 'wallet' && (
            <div className="space-y-6 lg:space-y-8">
              <div className="text-center mb-8 lg:mb-10">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                </div>
                <h3 className="text-slate-900 mb-2 text-lg lg:text-2xl font-semibold">Connect Your Wallet</h3>
                <p className="text-slate-600 lg:text-lg">
                  Connect your Web3 wallet to receive secure payments
                </p>
              </div>

              <Card className="p-6 lg:p-8 border-2 border-blue-100 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 lg:p-5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold lg:text-lg">M</span>
                      </div>
                      <span className="text-base lg:text-lg">MetaMask</span>
                    </div>
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-slate-300" />
                  </div>

                  <div className="flex items-center justify-between p-4 lg:p-5 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold lg:text-lg">W</span>
                      </div>
                      <span className="text-base lg:text-lg">WalletConnect</span>
                    </div>
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-slate-300" />
                  </div>
                </div>
              </Card>

              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl h-12 lg:h-14 text-base lg:text-lg"
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            </div>
          )}

          {/* Document Upload */}
          {step === 'documents' && (
            <div className="space-y-6 lg:space-y-8">
              <div className="text-center mb-8 lg:mb-10">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />
                </div>
                <h3 className="text-slate-900 mb-2 text-lg lg:text-2xl font-semibold">Verify Your Identity</h3>
                <p className="text-slate-600 lg:text-lg">
                  Upload your ID for verification to ensure platform safety
                </p>
              </div>

              <div className="space-y-4 lg:space-y-5">
                <div>
                  <label className="text-slate-700 mb-2 block text-sm lg:text-base font-medium">Full Name</label>
                  <Input placeholder="John Doe" className="rounded-xl h-12 lg:h-14 text-base" />
                </div>

                <div>
                  <label className="text-slate-700 mb-2 block text-sm lg:text-base font-medium">Government ID</label>
                  <Card className="p-6 lg:p-8 border-2 border-dashed border-slate-300 rounded-2xl text-center cursor-pointer hover:border-blue-400 transition-colors">
                    <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 lg:text-lg">Upload ID Document</p>
                    <p className="text-slate-400 text-sm lg:text-base">PNG, JPG up to 10MB</p>
                  </Card>
                </div>

                <div>
                  <label className="text-slate-700 mb-2 block text-sm lg:text-base font-medium">Selfie Verification</label>
                  <Card className="p-6 lg:p-8 border-2 border-dashed border-slate-300 rounded-2xl text-center cursor-pointer hover:border-blue-400 transition-colors">
                    <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 lg:text-lg">Take a selfie</p>
                    <p className="text-slate-400 text-sm lg:text-base">Hold your ID next to your face</p>
                  </Card>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl h-12 lg:h-14 text-base lg:text-lg"
                onClick={handleUploadDocuments}
              >
                Submit for Verification
              </Button>
            </div>
          )}

          {/* Processing */}
          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-green-600" />
              </div>
              <h3 className="text-slate-900 mb-2 text-lg lg:text-2xl font-semibold">Verification in Progress</h3>
              <p className="text-slate-600 text-center max-w-xs lg:max-w-md lg:text-lg">
                We're reviewing your documents. This usually takes a few minutes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
