import { useCallback, useReducer, useState } from "react";
import {
  QuickFiltersDisabledOptions,
  QuickFiltersValue,
} from "../quick-filters";
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
  authorized?: boolean;
}

function defineDisabledLabel(
  value: QuickFiltersValue,
  authorized: boolean | undefined,
  empty: boolean | undefined,
) {
  if (authorized && empty) {
    if (value === "essentials") return "No essentials services";
    if (value === "favorites") return "No favorites yet";
    if (value === "recents") return "No recents yet";
  }
  if (!authorized) {
    if (value === "essentials") return "Sign in to view essentials";
    if (value === "favorites") return "Sign in to view favorites";
    if (value === "recents") return "Sign in to view recents";
  }
  return "Disabled";
}

export default function useFilterState({
  defaultQuickFilter,
  authorized,
}: FilterStateProps) {
  const [emptyFilters, setEmptyFilters] = useState<
    Record<QuickFiltersValue, boolean>
  >({
    essentials: false,
    favorites: false,
    recents: false,
  });
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

  const handleDefaultViewChange = (value: QuickFiltersValue) => {
    if (!emptyFilters[value]) dispatch({ type: "SET_QUICK_FILTER", value });
  };

  const quickFiltersDisabledOptions: QuickFiltersDisabledOptions = {
    favorites: {
      label: defineDisabledLabel(
        "favorites",
        authorized,
        emptyFilters?.favorites,
      ),
      disabled: !authorized || Boolean(emptyFilters?.favorites),
    },
    recents: {
      label: defineDisabledLabel("recents", authorized, emptyFilters?.recents),
      disabled: !authorized || Boolean(emptyFilters?.recents),
    },
  };

  const handleEmptyFiltersUpdate = (
    emptyFilters: Record<QuickFiltersValue, boolean>,
  ) => {
    setEmptyFilters(emptyFilters);
    if (state.selectedQuickFilter && emptyFilters[state.selectedQuickFilter]) {
      dispatch({ type: "SET_QUICK_FILTER", value: "essentials" });
    }
  };

  return {
    state,
    quickFiltersDisabledOptions,
    updateEmptyFilters: handleEmptyFiltersUpdate,
    handleQuickFilterChange,
    handleCategoryChange,
    handleSearchQueryChange,
    handleDefaultViewChange,
  };
}
