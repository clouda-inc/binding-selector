import React, { useState, FC, SyntheticEvent } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Input, Button } from 'vtex.styleguide'
import { compose } from 'react-apollo'

interface Bindings {
  id: string
  canonicalBaseAddress: string
  defaultLocale: string
}

interface FormDialogProps {
  open: boolean
  handleToggle: () => void
  bindings: Bindings[]
  chosenBinding: Bindings
}

interface DataLocaleTypes {
  [key: string]: string
}

interface TranslatedLocales {
  [key: string]: string
}

interface Payload {
  chosenId: string
  translatedLocales: TranslatedLocales
}

const FormDialog: FC<FormDialogProps> = (props: FormDialogProps) => {
  const { open, handleToggle, bindings, chosenBinding } = props
  const [dataLocales, setDataLocales] = useState<DataLocaleTypes>({})

  const handleChange = (event: SyntheticEvent) => {
    const { name, value } = event.target as HTMLButtonElement

    setDataLocales({ ...dataLocales, [name]: value })
  }

  const showFields = () => {
    const fields = bindings?.map((binding: Bindings) => {
      if (binding.canonicalBaseAddress.split('/')[1] !== 'admin') {
        return (
          <div className="flex items-center justify-center w-100">
            <div className="pa4 w-40">
              <label>
                {binding.canonicalBaseAddress} ({binding.defaultLocale})
              </label>
            </div>
            <div className="pa4 w-50">
              <Input
                name={binding.id}
                onChange={(e: SyntheticEvent) => handleChange(e)}
                value={dataLocales[binding.defaultLocale]}
              />
            </div>
          </div>
        )
      }
    })

    return fields
  }

  const onSubmit = () => {
    const payload = {} as Payload

    payload.chosenId = chosenBinding.id
    payload.translatedLocales = dataLocales
    console.log(payload)
  }

  return (
    <Modal isOpen={open} onClose={handleToggle}>
      <div className="pt6 tc">
        <FormattedMessage id="admin-modal" />
      </div>
      <div className="pt6 flex w-100 flex-column justify-center items-center">
        {showFields()}
        <div className="flex pt6">
          <div className="pr4">
            <Button variation="tertiary">
              <FormattedMessage id="admin-cancel" />
            </Button>
          </div>
          <div>
            <Button onClick={onSubmit}>
              <FormattedMessage id="admin-save" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default compose(injectIntl)(FormDialog)
