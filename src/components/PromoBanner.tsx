import bannerImg from '../assets/below img.avif';

export default function TopOfferBanner() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <img
          src={bannerImg}
          alt="Mega Sale Banner"
          className="w-full h-auto rounded-md object-contain"
        />
      </div>
    </div>
  );
}
