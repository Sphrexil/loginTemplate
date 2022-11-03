import request from '@/utils/requestArticle.js'

// 查询文章列表
export function articleList(query) {
    return request({
        url: '/article/articleList',
        method: 'get',
        headers: {
          isToken: false
        },
        params: query
    })
}

//查询最热文章
export function hotArticleList() {
    return request({
        url: '/article/hotArticleList',
        headers: {
          isToken: false
        },
        method: 'get',

    })
}

//获取文章详情
export function getArticle(articleId) {
    return request({
        url: '/article/' + articleId,
        headers: {
          isToken: false
        },
        method: 'get'
    })
}

export function updateViewCount(articleId) {
  return request({
    url: '/article/updateViewCount/' + articleId,
    headers: {
      isToken: false
    },
    method: 'put'
  })
}
// 提交文章
export function commitArticle(article) {
  return request({
    url: '/article/commitArticle',
    headers: {
      isToken: true
    },
    method: 'post',
    data: article,
    isHandleData: false
  })
}

// 查询我的文章
export function queryMyArticles(userId) {
  return request({
    url: '/article/queryMyArticles/' + userId,
    headers: {
      isToken: true
    },
    method: 'get'
  })
}

// 删除我的文章
export function deleteMyArticle(articleId) {
  return request({
    url: '/article/deleteMyArticle/' + articleId,
    headers: {
      isToken: true
    },
    method: 'delete'
  })
}
