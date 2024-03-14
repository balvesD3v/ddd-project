import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export function makeQuestionComment(
  override: Partial<QuestionComment> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
