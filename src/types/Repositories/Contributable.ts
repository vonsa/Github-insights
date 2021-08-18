/*
label: good first issue | help wanted
*/

/*

query { 
  user(login: "vonsa") {
        id
    		starredRepositories {
          nodes {
            stargazerCount
            name
            languages {
              nodes {
              	name
              }
            }
            repositoryTopics {
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
            collaborators {
              nodes {
                name
              }
            }
            createdAt
            interactionAbility {
              limit
            }
            isArchived
            isDisabled
            labels(query: "label:'good first issue' state:open") {
              nodes {
                name
                isDefault
              }
            }
            url
            viewerPermission
            watchers {
              totalCount
            }
            shortDescriptionHTML(limit: 200)
            issues(states: OPEN, labels: "good first issue", filterBy: { assignee: null }){
              nodes {
                title
                labels {
                  nodes {
                    name
                  }
                }
                repository {
                  name
                  stargazerCount
                }
                viewerCanReact
                viewerCanUpdate
                url
              }
            }
          }
        }
    }
}

*/

export interface Contributable {
  labels: string
}
