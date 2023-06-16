"use client";
import { FC } from "react";
import Link from "next/link";
import { BsFillGearFill } from "react-icons/bs";
import { useParams } from "next/navigation";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Button } from "@/shared/components/Button";
import { useGetUserQuery } from "@/modules/profile/api/repository";
import FollowButton from "@/modules/feed/components/FollowButton";
import Feed from "@/modules/feed/components/Feed";
import FeedToggler from "@/modules/feed/components/FeedToggler";

const AuthorPage: FC = () => {
  const { author } = useParams();
  const { user } = useAuth();

  const { data, isLoading } = useGetUserQuery({
    username: author,
  });

  if (isLoading) {
    return <p className="container mx-auto">loading author...</p>;
  }

  if (!data) {
    return <p className="container mx-auto">author not found</p>;
  }

  const isMyProfile = data?.profile.username === user?.username;

  const feedToogleItems = [
    {
      text: "Favorited Articles",
      link: `/${author}/favorites`,
    },
  ];

  return (
    <div>
      <div className="w-full text-center py-8 bg-conduit-gray-150 mb-5">
        <img
          src={data?.profile.image}
          alt={data?.profile?.username}
          className="w-24 h-24 rounded-full mx-auto mb-5"
        />
        <h4 className="font-semibold text-2xl">{data?.profile?.username}</h4>
        <div className="container mx-auto flex justify-end">
          {isMyProfile ? (
            <Link href="settings" className="text-green-500 mb-3 text-sm  ">
              <Button>
                <BsFillGearFill className="inline mr-2" />
                Edit Profile Settings
              </Button>
            </Link>
          ) : (
            <FollowButton
              username={data.profile.username}
              isFollowing={data.profile.following}
            />
          )}
        </div>
      </div>
      <div className="container mx-auto">
        <FeedToggler
          items={feedToogleItems}
          defaultText="My Articles"
          defaultLink={`/${author}`}
        />
        <Feed />
      </div>
    </div>
  );
};

export default AuthorPage;
