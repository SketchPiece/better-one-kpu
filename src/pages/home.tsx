import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";
import CategoriesFilterDialog from "@/components/home/categories-filter-dialog";
import QuickFilters from "@/components/home/quick-filters";
import Greeting from "@/components/home/greeting";
import QuickServices from "@/components/home/quick-services";
import OtherServices from "@/components/home/other-services";
import { usePreferences } from "@/hooks/use-preferences";
import useFilterState from "@/components/home/hooks/use-filter-state";
import { useUserProfileQuery } from "@/hooks/api/use-user-profile-query";
import { useDebouncedValue } from "@mantine/hooks";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { useColorAppearance } from "@/hooks/use-color-appearance";

export default function Home() {
  useColorAppearance();
  const { data: userProfile } = useUserProfileQuery();
  const {
    preferences: { defaultView },
  } = usePreferences();

  const {
    state,
    handleQuickFilterChange,
    handleCategoryChange,
    handleSearchQueryChange,
  } = useFilterState({ defaultQuickFilter: defaultView });

  const [debouncedSearchQuery] = useDebouncedValue(state.searchQuery, 500);

  const showQuickServices = state.selectedQuickFilter !== null;

  return (
    <div>
      <Header
        searchQuery={state.searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <main className="mt-8 px-6">
        <div className="flex justify-between">
          <Greeting name={userProfile?.greetingName} />
          <div className="flex items-center gap-4">
            <QuickFilters
              value={state.selectedQuickFilter}
              onChange={handleQuickFilterChange}
              authorized={Boolean(userProfile)}
            />
            <Separator orientation="vertical" className="h-8" />
            <CategoriesFilterDialog
              value={state.selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        {showQuickServices && (
          <QuickServices filter={state.selectedQuickFilter} />
        )}
        <OtherServices
          searchQuery={debouncedSearchQuery}
          category={state.selectedCategory}
          quickFilter={state.selectedQuickFilter}
        />
      </main>
      <ScrollToTopButton />
    </div>
  );
}
