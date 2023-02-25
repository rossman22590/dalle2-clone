"use client";

import { useState } from "react";
import { JsxElement } from "typescript";
import Card from "./Card";
import FormField from "./FormField";
import Loader from "./Loader";

type Props = {
  data: [{ id: string; name: string }] | undefined | null;
  title: string | undefined | null;
};

const RenderCard = ({ data, title }: Props): any => {
  if (data?.length! > 0) {
    return data?.map((post) => (
      <>
        <Card key={post?.id!} postData={post} />
      </>
    ));
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

function ShowCase() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState();
  let searchResults: [{ id: string; name: string }] = [
    { id: "aa", name: "asd" },
  ];

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
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-18">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for
                <span className="text-[#222328]"> {searchText}</span>
              </h2>
            )}
            <div className=" grid lg:grid-cold-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCard data={[]} title="No search reults found" />
              ) : (
                <RenderCard data={[]} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ShowCase;
