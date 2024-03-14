import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('Should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentario',
    )
  })
})
