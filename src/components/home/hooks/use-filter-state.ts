import { useDebouncedValue } from "@mantine/hooks";
import { useCallback, useReducer } from "react";
import { QuickFiltersValue } from "../quick-filters";
import { CategoryValue } from "@/lib/categories";
import { Nullable } from "@/lib/types";

type Action =
  | { type: "SET_QUICK_FILTER"; value: Nullable<QuickFiltersValue> }
  | { type: "SET_CATEGORY"; value: Nullable<CategoryValue> }
  | { type: "SET_SEARCH_QUERY"; query: string };

interface State {
  searchQuery: string;
  selectedQuickFilter: Nullable<QuickFiltersValue>;
  selectedCategory: Nullable<CategoryValue>;
}

const reducer =
  (defaultView: QuickFiltersValue) =>
  (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_QUICK_FILTER":
        return {
          ...state,
          selectedQuickFilter: action.value,
          selectedCategory: null,
          searchQuery: "",
        };
      case "SET_CATEGORY":
        return {
          ...state,
          selectedCategory: action.value,
          selectedQuickFilter: action.value === null ? defaultView : null,
          searchQuery: "",
        };
      case "SET_SEARCH_QUERY":
        return {
          ...state,
          searchQuery: action.query,
          selectedQuickFilter: action.query === "" ? defaultView : null,
          selectedCategory: null,
        };
      default:
        return state;
    }
  };

const initialState = (defaultView: QuickFiltersValue) =>
  ({
    searchQuery: "",
    selectedQuickFilter: defaultView,
    selectedCategory: null,
  }) satisfies State;

interface FilterStateProps {
  defaultQuickFilter: QuickFiltersValue;
}

export default function useFilterState({
  defaultQuickFilter,
}: FilterStateProps) {
  const [state, dispatch] = useReducer(
    reducer(defaultQuickFilter),
    initialState(defaultQuickFilter),
  );

  const handleQuickFilterChange = useCallback(
    (value: QuickFiltersValue) => {
      dispatch({ type: "SET_QUICK_FILTER", value });
    },
    [dispatch],
  );

  const handleCategoryChange = useCallback(
    (value: Nullable<CategoryValue>) => {
      dispatch({ type: "SET_CATEGORY", value });
    },
    [dispatch],
  );

  const handleSearchQueryChange = useCallback(
    (query: string) => {
      dispatch({ type: "SET_SEARCH_QUERY", query });
    },
    [dispatch],
  );

  return {
    state,
    handleQuickFilterChange,
    handleCategoryChange,
    handleSearchQueryChange,
  };
}
