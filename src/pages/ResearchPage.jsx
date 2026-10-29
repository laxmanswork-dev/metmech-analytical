import ResearchBook from '../components/book/ResearchBook.jsx'
import Seo from '../components/common/Seo.jsx'
import { useLanguage } from '../hooks/useLanguage.js'
import { ROUTES } from '../routes/pages.js'

// The bolt at the centre of the home hero leads here. The whole page is one
// book (ResearchBook), and all of its content comes from the client's
// standard metallographic specimen booklets (src/data/specimens.js and
// `research` in the dictionaries).
export default function ResearchPage() {
  const { t } = useLanguage()

  return (
    <>
      <Seo
        title={t('research.meta.title')}
        description={t('research.meta.description')}
        path={ROUTES.research}
      />
      <ResearchBook />
    </>
  )
}
