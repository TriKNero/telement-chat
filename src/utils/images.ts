export function getPostImageUrl(postId: number, width = 400, height = 250): string {
  return `https://picsum.photos/seed/${postId}/${width}/${height}`
}

export function getAvatarUrl(userId: number, size = 80): string {
  return `https://i.pravatar.cc/${size}?u=${userId}`
}

export const POST_IMAGE_HEIGHT = 280
export const POST_CARD_IMAGE_HEIGHT = 160
export const SIDEBAR_AVATAR_SIZE = 56
