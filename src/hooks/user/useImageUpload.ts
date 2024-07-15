import { useState } from 'react';

export function useImageUpload(userImage?: string) {
  const [profileImage, setProfileImage] = useState<string>(
    userImage as string,
  ); // base64 프로필 이미지
  const [profileFile, setProfileFile] = useState<File>(); // 프로필 이미지 파일

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result?.toString() as string;
        setProfileImage(base64String); // 프론트에서 보여질 이미지
        setProfileFile(file); // API로 보낼 이미지 파일
      };
      reader.readAsDataURL(file);
    }
  };

  return { profileImage, profileFile, handleImageUpload };
}
