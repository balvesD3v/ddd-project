import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answers-comments-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CommentOnAnswersUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswersUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })
    await this.answersCommentRepository.create(answerComment)

    return { answerComment }
  }
}
