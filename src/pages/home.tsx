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
import { useQuickServices } from "@/hooks/api/use-quick-services";

export default function Home() {
  useColorAppearance();
  const { data: userProfile, isLoading: isUserProfileLoading } =
    useUserProfileQuery();
  const {
    preferences: { defaultView },
  } = usePreferences();

  const isAuthorized = Boolean(userProfile) && !isUserProfileLoading;

  const {
    state,
    quickFiltersDisabledOptions,
    updateEmptyFilters,
    handleQuickFilterChange,
    handleCategoryChange,
    handleSearchQueryChange,
    handleDefaultViewChange,
  } = useFilterState({
    defaultQuickFilter: defaultView,
    authorized: isAuthorized,
  });

  const { data: quickServices, isLoading: isQuickServicesLoading } =
    useQuickServices({
      quickFilter: state.selectedQuickFilter || undefined,
      onServicesEmptyUpdate: (emptyFilters) => updateEmptyFilters(emptyFilters),
    });

  const [debouncedSearchQuery] = useDebouncedValue(state.searchQuery, 500);

  const showQuickServices = state.selectedQuickFilter !== null;

  return (
    <div>
      <Header
        searchQuery={state.searchQuery}
        onDefaultViewChange={handleDefaultViewChange}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <main className="mt-4 px-6 md:mt-8">
        <div className="flex flex-col justify-between md:flex-row">
          <Greeting name={userProfile?.greetingName} />
          <div className="hidden items-center gap-4 md:flex">
            <QuickFilters
              value={state.selectedQuickFilter}
              onChange={handleQuickFilterChange}
              disabledOptions={quickFiltersDisabledOptions}
            />
            <Separator orientation="vertical" className="h-8" />
            <CategoriesFilterDialog
              value={state.selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        {showQuickServices && (
          <QuickServices
            services={quickServices}
            loading={isQuickServicesLoading}
          />
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
