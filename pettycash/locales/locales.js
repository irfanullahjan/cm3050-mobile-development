import { auth } from "./namespace.auth";
import { navigation } from "./namespace.navigation";
import { settings } from "./namespace.settings";
import { translation } from "./namespace.translation";
import { user } from "./namespace.user";
import { wallet } from "./namespace.wallet";

export const resources = {
  en: {
    translation: translation.en,
    navigation: navigation.en,
    settings: settings.en,
    user: user.en,
    wallet: wallet.en,
    auth: auth.en,
  },
  fr: {
    translation: translation.fr,
    navigation: navigation.fr,
    settings: settings.fr,
    user: user.fr,
    wallet: wallet.fr,
    auth: auth.fr,
  },
  es: {
    translation: translation.es,
    navigation: navigation.es,
    settings: settings.es,
    user: user.es,
    wallet: wallet.es,
    auth: auth.es,
  },
};
