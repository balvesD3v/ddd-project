import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answers-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FecthAnswersCommentsUseCase {
  constructor(
    private readonly answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answersCommentRepository.findByAnswerId(
      answerId,
      {
        page,
      },
    )

    return {
      answerComments,
    }
  }
}
