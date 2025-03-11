import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const LoadingScreen = ({ onComplete }) => {

    const [text, setText] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);
    const fullText = "Hello Amigos";

    useEffect(()=>{
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(interval);

                setTimeout(()=>{
                  setShowAnimation(true);
                },500);

                setTimeout(() => {
                    onComplete();
                }, 3000);
            }
        }, 100);

    return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black text-gray-100 flex flex-col items-center justify-center">
          <div className=" flex mb-4 text-4xl font-mono font-bold">

           <span> {text} </span>
           <span>
            {showAnimation && (
                  <DotLottieReact
                  src="https://lottie.host/aeedd5ed-1de0-4a86-95d4-ed3e71aee1f7/ZZXcw1Ujvp.lottie"
                  loop
                  autoplay
                  className="w-10 h-10 ml-1"
                />
                )}
                
            </span>
            <span className="animate-blink ml-1">|</span>

          
            
          </div>
    
          <div className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
            <div className="w-[40%] h-full bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
          </div>
        </div>
    );
};