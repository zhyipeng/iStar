export interface UserInfo {
  avatar: string
  followers: number
  following: number
}

export interface RepoOwner {
  avatar_url: string
  html_url: string
}

export interface Repo {
  id: number
  name: string
  html_url: string
  forks_count: number
  watchers_count: number
  topics: string[]
  language: string | null
  stargazers_count: number
  description: string
  owner: RepoOwner
  updated_at: string
  url: string
}

export interface Tag {
  tag: string
  repo_count: number
}
