import { assetUrl } from "../../utils/helpers";

const Avatar = ({ user, size = "h-12 w-12", text = "text-lg" }) => {
  const src = assetUrl(user?.profileImageUrl);
  const initials = (user?.fullName || "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={`${size} shrink-0 rounded-full object-cover ring-2 ring-white/20`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${size} ${text} grid shrink-0 place-items-center rounded-full bg-primary-yellow font-display font-bold text-finora-primary shadow-sm`}
    >
      {initials}
    </span>
  );
};

export default Avatar;
