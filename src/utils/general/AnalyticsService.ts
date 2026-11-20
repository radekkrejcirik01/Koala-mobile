import analytics from '@react-native-firebase/analytics';

class AnalyticsServiceClass {
  private currentScreen: string | undefined;

  // Keeps dev builds out of the production data
  public init = () => {
    analytics().setAnalyticsCollectionEnabled(!__DEV__).catch();
  };

  public logScreen = (screenName: string | undefined) => {
    if (!screenName || screenName === this.currentScreen) {
      return;
    }

    this.currentScreen = screenName;
    analytics()
      .logScreenView({ screen_name: screenName, screen_class: screenName })
      .catch();
  };
}

export const AnalyticsService: AnalyticsServiceClass =
  new AnalyticsServiceClass();
