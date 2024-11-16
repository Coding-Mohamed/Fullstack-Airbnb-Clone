import React, { Suspense } from "react";
import SearchResults from "../_components/SearchResults";

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
