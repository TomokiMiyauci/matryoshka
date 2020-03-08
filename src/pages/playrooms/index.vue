<template>
  <v-container>
    {{ stage }}
    <v-dialog
      :value="isStage('=', 1)"
      fullscreen
      persistent
      overlay
      max-width="500px"
      transition="dialog-bottom-transition"
    >
      <the-game-rules :enable-close="false" @click="click" @close="prev()" />
    </v-dialog>

    <v-row>
      <v-col cols="12" sm="6">
        <v-subheader>Looking for opponents</v-subheader>
        <v-alert v-show="true" type="info">
          There are currently no rooms available for competition. You can create
          a new room at the push
          <v-icon>mdi-gamepad-round-up</v-icon>.
        </v-alert>
        <v-row
          justify="start"
          align-content="center"
          align-content-xl="start"
          justify-xl="start"
          justify-sm="start"
        >
          <v-col>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="link"
                  >Single-line item</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-btn color="success" @click="update">update</v-btn>
            <v-btn color="success" @click="update">text</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <v-subheader>In Battle</v-subheader>
        <v-alert type="info">
          The following rooms are currently in play. You can watch it.
        </v-alert>
        <v-row justify="start" align-content="start">
          <v-col>
            <v-card width="140px" height="140px">
              <v-avatar-with-name name="aaa"></v-avatar-with-name>
              <v-avatar-with-name
                name="aaa"
                style="position: absolute; right: 0; bottom: 0;"
                reverse
              ></v-avatar-with-name>

              <v-playroom-tag> </v-playroom-tag>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { Playroom } from '../../types/playroom'
import VAvatarWithName from '~/components/molecules/VAvatarWithName.vue'
import firebase, { firestore } from '~/plugins/firebase'
import progress from '~/compositions/progress'
import { playerStore, playStore } from '~/store'
export default createComponent({
  components: {
    VAvatarWithName,
    VPlayroomTag: () => import('~/components/atoms/VPlayroomTag.vue'),
    TheGameRules: () => import('~/components/organisms/TheGameRules.vue')
  },

  layout: 'playroom',

  setup(_, { root }) {
    const { stage, isStage, next, prev } = progress(3)

    root.$nuxt.$on('emit', () => {
      if (isStage('=', 0)) next()
    })

    const click = async (payload: any) => {
      next()
      await createRoom(payload)
      next()
    }

    const createRoom = async (payload: any) => {
      playerStore.setPlayer('PLAYER1')
      const { id, path } = await createPlayroom({
        order: payload,
        people: playerStore.player
      })

      playStore.setPlayroomId(id)
      playStore.setPlayroomPath(path)

      root.$router.push('/playrooms/online')
    }

    const update = async () => {
      const data = await firestore
        .collection('test')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()

      console.log(data)

      data.forEach(async (result) => {
        console.log(result.data(), result.ref.path)
        await firestore.doc(result.ref.path).update({
          people: firebase.firestore.FieldValue.arrayUnion('greater_virginia')
        })
      })
    }

    const createPlayroom = ({
      order,
      people
    }: {
      order: Playroom['order']
      people: string
    }) => {
      const playroom: Playroom = {
        player1Wins: 0,
        player2Wins: 0,
        round: 1,
        order,
        people: [people],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }
      return firestore.collection('test').add(playroom)
    }

    const link = async () => {
      console.log(1)
      playerStore.setPlayer('PLAYER2')
      const data = await firestore
        .collection('test')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()

      data.forEach(async (result) => {
        console.log(result.data(), result.ref.path)
        await firestore.doc(result.ref.path).update({
          people: firebase.firestore.FieldValue.arrayUnion('greater_virginia')
        })
        playStore.setPlayroomId(result.id)
        playStore.setPlayroomPath(result.ref.path)
      })

      root.$router.push('/playrooms/online')
    }

    return { update, createRoom, click, isStage, prev, stage, link }
  }
})
</script>
