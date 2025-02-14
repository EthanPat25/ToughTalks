import {HeroVideoDialog} from "../ui/videoDialog";

interface VideoDialogProps {
    button: React.ReactElement;
  }

export function VideoDialog({button}:VideoDialogProps) {
    console.log("Button received in VideoDialog: ", button);
  return (
    <div className="relative">
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/znAQh02_2AA"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
        button = {button}
      />
    </div>
  );
}
