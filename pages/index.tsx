import { useQuery, gql } from "@apollo/client";
import React from "react";

const HELLOWORLD = gql`
  query hello {
    helloWorld
  }
`;

export default () => {
  const { data, loading, error } = useQuery(HELLOWORLD);

  return (
    <div className="flex bg-gray-50  items-center justify-center min-h-screen flex-col space-y-9">
      <div className="">
        <h1 className="text-7xl font-black bg-inherit uppercase bg-gradient-to-r from-fuchsia-600 to-sky-600 bg-clip-text text-transparent">
          FullStack Boiler Plate
        </h1>
      </div>
      <h3 className="text-4xl font-bold">
        I'm Coming From Server{" "}
        {loading ? (
          <div className="border-t-4 inline-block border-purple-500 rounded-full w-10 h-10 animate-spin"></div>
        ) : (
          <span className="italic text-purple-500">{data.helloWorld}</span>
        )}
      </h3>
    </div>
  );
};
