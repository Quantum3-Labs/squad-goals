import Image from "next/image";

interface CardItemProps {
  title: string;
  imageUrl: string;
}

export const CardItem: React.FC<CardItemProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-[#BBD4FA] rounded-xl max-w-[270px] flex flex-col items-center justify-center p-4">
      <Image src={imageUrl} alt="winner-challenges" width={216} height={216} />
      <span className="font-bold">{title}</span>
    </div>
  );
};
