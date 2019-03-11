import { shallowMount } from '@vue/test-utils';
import expect from 'expect';
import FramesTable from '../../../resources/assets/js/components/FramesTable/index.vue';
import Factory from '../utilities/Factory';

describe('Game Scoring', () => {
  it('should_score_a_gutter_game_as_zero', () => {
    const frames = Factory.make('Frame', {
      rolls: Factory.make('Roll', {pins: 0}, 2)
    }, 10);
    let wrapper = shallowMount(FramesTable, {
      propsData: {
        frames,
      }
    });

    expect(wrapper.vm.score).toEqual(0);
  });

  it('should_score_a_game_of_all_ones_as_twenty', () => {
    const frames = Factory.make('Frame', {
      rolls: Factory.make('Roll', {pins: 1}, 2)
    }, 10);
    let wrapper = shallowMount(FramesTable, {
      propsData: {
        frames,
      }
    });

    expect(wrapper.vm.score).toEqual(20);
  });

  it('should_score_a_game_of_3_and_5_as_8', () => {
    const frames = [
      Factory.make('Frame', {
        rolls: [
          Factory.make('Roll', {pins: 3}),
          Factory.make('Roll', {pins: 5}),
        ]
      }),
      ...Factory.make('Frame', {
        rolls: Factory.make('Roll', {pins: 0}, 2),
      }, 9)
    ];
    let wrapper = shallowMount(FramesTable, {
      propsData: {
        frames,
      }
    });

    expect(wrapper.vm.score).toEqual(8);
  });

  it('should_give_a_one_roll_bonus_for_a_spare', () => {
    const frames = [
      Factory.make('Frame', {
        rolls: [
          Factory.make('Roll', {pins: 3}),
          Factory.make('Roll', {pins: 7}),
        ]
      }),
      Factory.make('Frame', {
        rolls: [
          Factory.make('Roll', {pins: 3}),
          Factory.make('Roll', {pins: 0}),
        ]
      }),
      ...Factory.make('Frame', {
        rolls: Factory.make('Roll', {pins: 0}, 2),
      }, 8)
    ];
    let wrapper = shallowMount(FramesTable, {
      propsData: {
        frames,
      }
    });

    expect(wrapper.vm.score).toEqual(16);
  });

  it('should_give_a_two_roll_bonus_for_a_strike', () => {
    const frames = [
      Factory.make('Frame', {
        rolls: [
          Factory.make('Roll', {pins: 10}),
        ]
      }),
      Factory.make('Frame', {
        rolls: [
          Factory.make('Roll', {pins: 3}),
          Factory.make('Roll', {pins: 5}),
        ]
      }),
      ...Factory.make('Frame', {
        rolls: Factory.make('Roll', {pins: 0}, 2),
      }, 8)
    ];
    let wrapper = shallowMount(FramesTable, {
      propsData: {
        frames,
      }
    });

    expect(wrapper.vm.score).toEqual(26);
  });

  it('should_give_a_score_of_300_for_a_perfect_game', () => {
    const frames = [
      ...Factory.make('Frame', {
        rolls: [Factory.make('Roll', {pins: 10})],
      }, 9),
      Factory.make('Frame', {
        rolls: Factory.make('Roll', {pins: 10}, 3),
      })
    ];
    let wrapper = shallowMount(FramesTable, {
      propsData: {
        frames,
      }
    });

    expect(wrapper.vm.score).toEqual(300);
  });
});