import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestioBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestioBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestioBySlugUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to get question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('my-new-title') })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'my-new-title',
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
