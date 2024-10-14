import { useSnack } from '../../../hooks/useSnack'

import { Head } from '../../../components/Head'
import { Snacks } from '../../../components/Snacks'
import { SnackTitle } from '../../../components/SnackTitle'

export default function Cupcakes() {
  const { cupcakes } = useSnack()

  return (
    <>
      <Head title='Cupcakes' />
      <SnackTitle>cupcakes</SnackTitle>
      <Snacks snacks={cupcakes}></Snacks>
    </>
  )
}
