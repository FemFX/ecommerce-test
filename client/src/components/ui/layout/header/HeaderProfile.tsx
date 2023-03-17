import { useProfile } from "@/src/hooks/useProfile";
import Image from "next/image";
import { FC } from "react";

export interface IHeaderProfileProps {}
const HeaderProfile: FC<IHeaderProfileProps> = ({}) => {
  const { profile } = useProfile();

  return (
    <div>
      {profile?.avatarPath && (
        <Image
          width={43}
          height={43}
          src={profile.avatarPath}
          alt="profile"
          className="rounded-full border-primary border border-solid animate-opacity"
        />
      )}
    </div>
  );
};
export default HeaderProfile;
