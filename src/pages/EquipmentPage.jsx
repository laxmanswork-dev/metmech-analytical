import { Search } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/common/Button.jsx'
import CtaBand from '../components/common/CtaBand.jsx'
import InstrumentCard from '../components/common/InstrumentCard.jsx'
import PageHero from '../components/common/PageHero.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Seo from '../components/common/Seo.jsx'
import Grid from '../components/layout/Grid.jsx'
import Section from '../components/layout/Section.jsx'
import { INSTRUMENT_CATEGORIES, INSTRUMENTS } from '../data/instruments.js'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'
import styles from './EquipmentPage.module.css'

const ALL = 'all'

export default function EquipmentPage() {
  const { t } = useLanguage()
  const [category, setCategory] = useState(ALL)
  const [query, setQuery] = useState('')

  const search = query.trim().toLowerCase()
  const visible = INSTRUMENTS.filter(({ slug, category: instrumentCategory }) => {
    if (category !== ALL && instrumentCategory !== category) return false
    if (!search) return true
    const text = `${t(`equipment.items.${slug}.name`)} ${t(`equipment.items.${slug}.short`)}`
    return text.toLowerCase().includes(search)
  })

  const reset = () => {
    setCategory(ALL)
    setQuery('')
  }

  return (
    <>
      <Seo
        title={t('equipment.meta.title')}
        description={t('equipment.meta.description')}
        path={ROUTES.equipment}
      />
      <PageHero
        title={t('equipment.hero.title')}
        lead={t('equipment.hero.lead')}
        breadcrumbs={[
          { label: t('nav.home'), to: ROUTES.home },
          { label: t('nav.equipment'), to: ROUTES.equipment },
        ]}
      />

      <Section labelledBy="catalogue-heading">
        <SectionHeading id="catalogue-heading" title={t('equipment.catalogue.heading')} />

        <div className={styles.controls}>
          <div className={styles.search}>
            <label htmlFor="instrument-search" className="visually-hidden">
              {t('equipment.catalogue.searchLabel')}
            </label>
            <Search aria-hidden="true" size={18} className={styles.searchIcon} />
            <input
              id="instrument-search"
              type="search"
              className={styles.searchInput}
              placeholder={t('equipment.catalogue.searchPlaceholder')}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <fieldset className={styles.filters}>
            <legend className="visually-hidden">{t('equipment.catalogue.filterLabel')}</legend>
            {[ALL, ...INSTRUMENT_CATEGORIES].map((option) => (
              <button
                key={option}
                type="button"
                className={styles.filter}
                aria-pressed={category === option}
                onClick={() => setCategory(option)}
              >
                {t(`equipment.categories.${option}`)}
              </button>
            ))}
          </fieldset>
        </div>

        {/* <output> is announced by screen readers when the count changes. */}
        <output className={styles.count}>
          {t('equipment.catalogue.count', { count: visible.length })}
        </output>

        {visible.length > 0 ? (
          <Grid>
            {visible.map(({ slug }) => (
              <InstrumentCard key={slug} slug={slug} />
            ))}
          </Grid>
        ) : (
          <div className={styles.empty}>
            <p>{t('equipment.catalogue.empty')}</p>
            <Button variant="secondary" onClick={reset}>
              {t('equipment.catalogue.reset')}
            </Button>
          </div>
        )}
      </Section>

      <CtaBand />
    </>
  )
}
