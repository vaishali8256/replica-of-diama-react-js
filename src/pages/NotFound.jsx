import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" />
      <section className="container section text-center"><Button to="/">Back to Home</Button></section>
    </>
  )
}
