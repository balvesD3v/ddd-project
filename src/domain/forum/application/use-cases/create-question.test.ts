import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'test content',
      title: 'test title',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
  })
})
