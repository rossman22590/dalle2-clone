"use client";

import { useState } from "react";
import { Card, FormField, Skeleton } from "@/components";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, DocumentData, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import Link from "next/link";

type Props = {
  data: DocumentData[] | undefined;
  title: string | undefined | null;
};

const RenderCard = ({ data, title }: Props): any => {
  let i = 0;
  if (data?.length! > 0) {
    return data?.map((post, id) => <Card key={id} _id={id} post={post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

function ShowCase() {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<DocumentData[]>();

  const [posts] = useCollection(
    session && query(collection(db, "posts"), orderBy("createdAt", "desc"))
  );

  let postsData = posts?.docs.map((post) => {
    const data = post.data();
    return data;
  });

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
    setTimeout(() => {
      const searchResults = postsData?.filter((item) => {
        return (
          item.user?.name
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          item.prompt
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      });
      console.log("searchResults:", searchResults);
      setSearchResults(searchResults);
    }, 500);
  };

  return (
    <>
      <div>
        <h1 className=" font-extrabold text-[#222328] text-[32px]">
          The Community ShowCase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-2-[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI.
        </p>
        <div className="mt-5">
          <Link
            href="/create-post"
            className=" font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md  md:hidden "
            title="Create your AI Image"
          >
            Create AI Image
          </Link>
        </div>
      </div>

      <div className="mt-16 mb-10">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-18">
        {searchText && (
          <h2 className="font-medium text-[#666e75] text-xl mb-3">
            Showing results for
            <span className="text-[#222328]"> {searchText}</span>
          </h2>
        )}
        <div className=" grid lg:grid-col-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {searchText ? (
            <RenderCard data={searchResults} title="No search reults found" />
          ) : !postsData ? (
            Array(20)
              .fill("")
              .map((e, key) => <Skeleton key={key} />)
          ) : (
            <RenderCard data={postsData} title="" />
          )}
        </div>
      </div>
    </>
  );
}

export default ShowCase;
