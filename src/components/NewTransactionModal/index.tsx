import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  //type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    register, 
    handleSubmit, 
    formState: {isSubmitting}
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  function handleCreateNewTransaction (data: NewTransactionFormInputs) {
    console.log(data)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" placeholder="Descrição" {...register('description')} required />
          <input type="number" placeholder="Preço" {...register('price', {valueAsNumber: true})} required />
          <input type="text" placeholder="Categoria" {...register('category')} required />

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp size={24}/>
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant='outcome' value='outcome'>
            <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}