import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
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
import useSocialStore, { Social } from "@/store/socials";
import { useTranslation } from "react-i18next";

interface SocialFormProps {
  social?: Social;
  onClose: () => void;
  userId?: number;
}

// Social media icons mapping
const socialIcons = [
  { value: "facebook", label: "Facebook", icon: <FaFacebook /> },
  { value: "twitter", label: "Twitter", icon: <FaTwitter /> },
  { value: "instagram", label: "Instagram", icon: <FaInstagram /> },
  { value: "linkedin", label: "LinkedIn", icon: <FaLinkedin /> },
  { value: "youtube", label: "YouTube", icon: <FaYoutube /> },
  { value: "tiktok", label: "TikTok", icon: <FaTiktok /> },
  { value: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp /> },
  { value: "telegram", label: "Telegram", icon: <FaTelegram /> },
  { value: "snapchat", label: "Snapchat", icon: <FaSnapchat /> },
  { value: "pinterest", label: "Pinterest", icon: <FaPinterest /> },
  { value: "reddit", label: "Reddit", icon: <FaReddit /> },
  { value: "discord", label: "Discord", icon: <FaDiscord /> },
  { value: "github", label: "GitHub", icon: <FaGithub /> },
  { value: "twitch", label: "Twitch", icon: <FaTwitch /> },
  { value: "spotify", label: "Spotify", icon: <FaSpotify /> },
];

const SocialForm: React.FC<SocialFormProps> = ({ social, onClose, userId }) => {
  const { addSocial, updateSocial, loading } = useSocialStore();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    icon: "",
    link: "",
    user_id: userId || 1,
  });

  const [errors, setErrors] = useState<{
    icon?: string;
    link?: string;
  }>({});

  useEffect(() => {
    if (social) {
      setFormData({
        icon: social.icon,
        link: social.link,
        user_id: social.user_id,
      });
    } else if (userId) {
      setFormData((prev) => ({
        ...prev,
        user_id: userId,
      }));
    }
  }, [social, userId]);

  // URL validation function
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: { icon?: string; link?: string } = {};

    if (!formData.icon) {
      newErrors.icon = t("errors.icon");
    }

    if (!formData.link) {
      newErrors.link = t("errors.link");
    } else if (!isValidUrl(formData.link)) {
      newErrors.link = t("errors.invalid_link");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("icon", formData.icon);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("user_id", formData.user_id.toString());

      if (social) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateSocial(social.id, formDataToSend as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await addSocial(formDataToSend as any);
      }
      onClose();
    } catch (error) {
      console.error("Error saving social:", error);
    }
  };

  const getSelectedIcon = () => {
    return (
      socialIcons.find((icon) => icon.value === formData.icon)?.icon || null
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {social
          ? t("admin.edit") + " " + t("admin.social_media").toLowerCase()
          : t("admin.add_new") + " " + t("admin.social_media").toLowerCase()}
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Social Media Icon Select */}
        <FormControl fullWidth margin="normal" required error={!!errors.icon}>
          <InputLabel>{t("forms.select_icon")}</InputLabel>
          <Select
            value={formData.icon}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, icon: e.target.value }));
              if (errors.icon) {
                setErrors((prev) => ({ ...prev, icon: undefined }));
              }
            }}
            label={t("forms.select_icon")}
            renderValue={(selected) => {
              const selectedIcon = socialIcons.find(
                (icon) => icon.value === selected
              );
              return (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {selectedIcon?.icon}
                  <span>{selectedIcon?.label}</span>
                </Box>
              );
            }}
          >
            {socialIcons.map((icon) => (
              <MenuItem key={icon.value} value={icon.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {icon.icon}
                  <span>{icon.label}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
          {errors.icon && <FormHelperText>{errors.icon}</FormHelperText>}
        </FormControl>

        {/* Link */}
        <TextField
          fullWidth
          label={t("forms.link")}
          value={formData.link}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, link: e.target.value }));
            if (errors.link) {
              setErrors((prev) => ({ ...prev, link: undefined }));
            }
          }}
          required
          margin="normal"
          placeholder="https://example.com"
          error={!!errors.link}
          helperText={errors.link}
        />
      </div>

      {/* Preview */}
      {formData.icon && (
        <Box sx={{ mt: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            معاينة:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {getSelectedIcon()}
            <Typography variant="body2" color="textSecondary">
              {formData.link || "سيظهر الرابط هنا"}
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          disabled={loading}
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          {loading ? "جاري الحفظ..." : social ? "تحديث" : "إضافة"}
        </Button>
      </Box>
    </Box>
  );
};

export default SocialForm;
