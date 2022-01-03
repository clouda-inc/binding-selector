import React, { useState } from 'react'
import type { FC } from 'react'
import { Button, ButtonGroup } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import LabelOption from './LabelsFlags'

const CSS_HANDLES = ['listContainer'] as const

interface Props {
  bindingList: TranslationsAndSettings[]
  onSelectBinding: (selectedBinding: TranslationsAndSettings) => void
  currentBinding: TranslationsAndSettings
  display: FlagDisplay
  isLoading: boolean
}

const BindingSelectorList: FC<Props> = ({
  bindingList,
  onSelectBinding,
  currentBinding,
  display,
  isLoading,
}) => {
  const [loading, setLoading] = useState(false)
  const handles = useCssHandles(CSS_HANDLES)

  const mappedBindings = bindingList
    .filter((binding) => {
      return !binding.hide
    })
    .map((binding) => {
      const flag = binding.customFlagData

      return (
        <Button
          key={binding.id}
          disabled={binding.id === currentBinding.id}
          isLoading={(loading && binding.id === currentBinding.id) || isLoading}
          onClick={() => {
            onSelectBinding(binding)
            setLoading(true)
          }}
        >
          <LabelOption binding={binding} display={display} flag={flag} />
        </Button>
      )
    })

  return (
    <div className={`${handles.listContainer}`}>
      <ButtonGroup buttons={mappedBindings} />
    </div>
  )
}

export default BindingSelectorList
