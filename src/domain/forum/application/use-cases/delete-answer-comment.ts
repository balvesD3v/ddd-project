import { AnswersCommentRepository } from '../repositories/answers-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answersCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answersCommentRepository.delete(answerComment)

    return {}
  }
}
