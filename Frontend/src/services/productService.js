import riceImg from '../assets/images/basmati-rice.jpg'
import dalImg from '../assets/images/toor-dal.jpg'
import oilImg from '../assets/images/sunflower-oil.jpg'
import wheatImg from '../assets/images/wheat-flour.jpg'
import sugarImg from '../assets/images/sugar.jpg'
import saltImg from '../assets/images/salt.jpg'
import teaImg from '../assets/images/green-tea.jpg'
import groundnutOilImg from '../assets/images/groundnut-oil.jpg'
import moongDalImg from '../assets/images/moong-dal.jpg'
import chanaDalImg from '../assets/images/chana-dal.jpg'
import teaPowderImg from '../assets/images/tea-powder.jpg'
import besanImg from '../assets/images/besan.jpg'

export function getProducts() {
  return [
    {
      id: 1,
      name: 'Basmati Rice',
      price: 80,
      image: riceImg,
      category: 'Grains',
    },
    {
      id: 2,
      name: 'Toor Dal',
      price: 120,
      image: dalImg,
      category: 'Pulses',
    },
    {
      id: 3,
      name: 'Sunflower Oil',
      price: 150,
      image: oilImg,
      category: 'Oils',
    },
    {
      id: 4,
      name: 'Wheat Flour',
      price: 45,
      image: wheatImg,
      category: 'Flour',
    },
    {
      id: 5,
      name: 'Sugar',
      price: 40,
      image: sugarImg,
      category: 'Essentials',
    },
    {
      id: 6,
      name: 'Salt',
      price: 20,
      image: saltImg,
      category: 'Essentials',
    },
    {
      id: 7,
      name: 'Green Tea',
      price: 90,
      image: teaImg,
      category: 'Beverages',
    },
    {
      id: 8,
      name: 'Groundnut Oil',
      price: 200,
      image: groundnutOilImg,
      category: 'Oils',
    },
    {
      id: 9,
      name: 'Moong Dal',
      price: 100,
      image: moongDalImg,
      category: 'Pulses',
    },
    {
      id: 10,
      name: 'Chana Dal',
      price: 90,
      image: chanaDalImg,
      category: 'Pulses',
    },
    {
      id: 11,
      name: 'Tea Powder',
      price: 160,
      image: teaPowderImg,
      category: 'Beverages',
    },
    {
      id: 12,
      name: 'Besan Flour',
      price: 55,
      image: besanImg,
      category: 'Flour',
    },
  ]
}
