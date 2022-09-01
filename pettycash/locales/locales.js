import { auth } from "./namespaces/auth";
import { navigation } from "./namespaces/navigation";
import { settings } from "./namespaces/settings";
import { translation } from "./namespaces/translation";
import { user } from "./namespaces/user";
import { wallet } from "./namespaces/wallet";

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
