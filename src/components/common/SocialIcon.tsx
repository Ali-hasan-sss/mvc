import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaSnapchat,
  FaPinterest,
  FaReddit,
  FaDiscord,
  FaGithub,
  FaTwitch,
  FaSpotify,
} from "react-icons/fa";

interface SocialIconProps {
  icon: string;
  size?: "small" | "medium" | "large";
  color?: string;
}

const socialIcons: {
  [key: string]: React.ComponentType<{ size?: number; color?: string }>;
} = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  snapchat: FaSnapchat,
  pinterest: FaPinterest,
  reddit: FaReddit,
  discord: FaDiscord,
  github: FaGithub,
  twitch: FaTwitch,
  spotify: FaSpotify,
};

const SocialIcon: React.FC<SocialIconProps> = ({
  icon,
  size = "medium",
  color = "inherit",
}) => {
  const sizeMap = {
    small: 20,
    medium: 24,
    large: 32,
  };

  const IconComponent = socialIcons[icon.toLowerCase()];

  if (!IconComponent) {
    // Return a default icon if the icon name is not found
    return (
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          backgroundColor: "#1976d2",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: sizeMap[size] * 0.6,
          fontWeight: "bold",
        }}
      >
        #
      </div>
    );
  }

  return <IconComponent size={sizeMap[size]} color={color} />;
};

export default SocialIcon;
