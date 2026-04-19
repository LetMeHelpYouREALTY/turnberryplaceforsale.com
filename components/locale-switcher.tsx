import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

export function LocaleSwitcher() {
  const { locales, asPath, locale: currentLocale } = useRouter()

  return (
    <div className="flex">
      {(locales ?? []).map((locale) => (
        <Link href={asPath} key={locale} locale={locale} passHref>
          <a
            data-cy={`local-switcher-${locale}`}
            className={classNames(
              "flex items-center justify-center p-2 uppercase",
              locale === currentLocale ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            )}
          >
            {locale}
          </a>
        </Link>
      ))}
    </div>
  )
}
