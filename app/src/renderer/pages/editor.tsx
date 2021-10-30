import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import dayjs from 'dayjs'
import type { EditorView } from 'prosemirror-view'
import type { MarkdownSerializer } from 'prosemirror-markdown'
import { Search } from 'css.gg/icons/all'
import { Menu, Layout, Button, Notification, Input } from 'granen'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { TopBar } from '@/renderer/components/TopBar'
import { dark } from 'editor/theme'
import Planit from 'editor/index'
import { BottomBar } from '@/renderer/components/BottomBar'
import { View } from '@/renderer/interface'
import { dictionary } from '@/renderer/constants'
import { TopDetail } from '@/renderer/components/Details/TopDetails'
import { NotificationDetail } from '@/renderer/components/Details/NotificationDetails'
import { getStats } from '@/renderer/utils'

type Stats = ReturnType<typeof getStats>

type Page = {
  title: string
  content: string
  done: boolean
  /**
   * todo note deadline
   * - day: [0, 23]
   * - week: [monday, sunday]
   */
  view: View
  duration: any[]
  id: string
  // TODO: stats.title to title
  stats?: Stats
}

const getDefaultPages = () => {
  const id = uuid()
  const defaultPages: Record<string, Page> = {
    [id]: {
      title: 'default',
      done: false,
      duration: [dayjs().subtract(1, 'week').format(), dayjs().format()],
      content: `# Welcome
  
  Just an easy to use **Markdown** editor with \`slash commands\`
  
  @timer 1s@
  
  - [ ] test @timer 1s@
    - [x] nested 1
    - [ ] nested
    - [x] nested 2
  
  `,
      view: 'week',
      id: uuid(),
    },
  }
  return defaultPages
}

const Editor = styled(Planit)`
  @apply h-full justify-start;
  & > div {
    @apply h-full p-8 pt-0;
  }
`

const Aside = styled(Layout.Aside)`
  [data-role='aside-inner-content'] {
    @apply flex flex-col justify-between h-full overflow-x-hidden;

    .todolist {
      @apply flex flex-col items-center w-full p-4 pt-0 box-border;

      [data-role='menu'] {
        @apply p-0;
      }
    }
  }
`

const TodoMenu = styled(Menu)`
  @apply p-0;
`

const Content = styled(Layout.Main)`
  @apply p-4 pt-0;
`

const SearchInput = styled(Input)`
  margin-top: 1px;

  @apply w-full mb-4;
`

const isOutDated = (duration: string[], now: dayjs.ConfigType) => {
  if (!duration) {
    return false
  }
  return dayjs(now).isAfter(dayjs(duration[1]))
}

const defaultPages = getDefaultPages()

export function EditorPage() {
  const [pages, setPages] = useState<Record<string, Page>>(defaultPages)
  const [id, setId] = useState<string>(Object.keys(defaultPages)[0])
  const [search, setSearch] = useState()
  const view = useRef<EditorView>()
  const serializer = useRef<MarkdownSerializer>()
  const ref = useRef(null)
  const cancel = useRef<any>(null)

  const activePage: Page = useMemo(() => {
    return id ? pages[id] : ({} as Page)
  }, [pages, id])

  const handleUpdatePages = useCallback((id?: string, stats?: Stats) => {
    if (!id) {
      return
    }
    setPages((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          stats,
        },
      }
    })
  }, [])

  const handleGenerateNextView = useCallback(() => {
    if (view.current && serializer.current && id) {
      const page = serializer.current.serialize(view.current.state.doc, { removeCheckedItem: true })
      let nextpages: Record<string, Page> = {
        ...pages,
        [id]: {
          ...activePage,
          done: true,
        },
      }
      cancel.current?.()
      const nextid = uuid()
      const nextpage: Page = {
        title: 'new',
        content: page,
        done: false,
        view: 'week',
        id: nextid,
        duration: [dayjs(), dayjs().add(1, 'week')],
      }
      nextpages = {
        ...nextpages,
        [nextid]: nextpage,
      }
      setPages(nextpages)
    }
  }, [activePage, id, pages])

  const handleCreateEmptyPage = useCallback(() => {
    const nextid = uuid()
    const nextpage: Page = {
      title: 'create',
      content: '# !!create!!',
      done: false,
      view: 'week',
      id: nextid,
      duration: [dayjs(), dayjs().add(1, 'week')],
    }
    setPages((prev) => {
      return {
        ...prev,
        [nextid]: nextpage,
      }
    })
    setId(nextpage.id)
  }, [])

  const handleToast = useCallback(
    (params: { stats?: Stats }) => {
      cancel.current = Notification.info({
        key: 1,
        title: 'Convert New Page',
        description: (
          <NotificationDetail
            total={params.stats?.total.length || 0}
            done={params.stats?.done.length || 0}
          />
        ),
        // TODO: handle next
        btn: <Button onClick={() => handleGenerateNextView()}>生成</Button>,
      })
    },
    [handleGenerateNextView],
  )

  useEffect(() => {
    const { duration, done, stats } = activePage
    // check current page view is outdated
    const outdated = isOutDated(duration, dayjs())
    if (view.current && outdated && !done) {
      if ((stats?.done?.length || 0) < (stats?.total?.length || 0)) {
        handleToast({ stats })
      }
    }
  }, [view, activePage, handleToast])

  return (
    <>
      <Notification
        forwardAPI={(add) => {
          ref.current = add
        }}
        limit={1}
      />
      <Aside open={true}>
        <div className="todolist">
          <TopBar />
          <SearchInput
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            placeholder="Search"
            prefix={<Search />}
          />
          <TodoMenu menuTheme="dark" selectedKeys={[activePage.title]}>
            <Menu.SubMenu title={dictionary[activePage.view]}>
              {Object.values(pages)
                .filter((page) =>
                  !search ? true : page.stats?.title?.node.textContent.includes(search),
                )
                .map((page, i) => {
                  return (
                    // TODO: make menu item large
                    <Menu.Item itemKey={page.title} onClick={() => setId(page.id)} key={page.id}>
                      {page.stats?.title?.node.textContent}
                      {/* TODO: use it in content */}
                      {/* <DatePicker>
                        <Calendar />
                      </DatePicker> */}
                    </Menu.Item>
                  )
                })}
            </Menu.SubMenu>
            {/* TODO: histories */}
            {/* <Menu.SubMenu title="归档">
                {histories.map((_page, i) => {
                  return (
                    <Menu.Item itemKey={pages[i].title} onClick={() => setIndex(i)} key={i}>
                      {pages[i].title}
                      <DatePicker>
                        <Calendar />
                      </DatePicker>
                    </Menu.Item>
                  )
                })}
              </Menu.SubMenu> */}
          </TodoMenu>
        </div>
        <BottomBar onClick={handleCreateEmptyPage} />
      </Aside>
      <Content>
        <TopBar mode="light" />
        <TopDetail
          total={activePage.stats?.total.length || 0}
          done={activePage.stats?.done.length || 1}
          title={activePage.stats?.title?.node.textContent}
        />
        <Editor
          // TODO: granen theme
          theme={{ ...dark, background: '#202125' }}
          value={activePage.content || ''}
          viewRef={(ref) => {
            view.current = ref
            const stats = getStats(ref.state.doc)
            handleUpdatePages(id, stats)
          }}
          serializerRef={(ref) => {
            serializer.current = ref
          }}
          onChange={(v) => {
            console.log(v())
          }}
        />
      </Content>
    </>
  )
}
