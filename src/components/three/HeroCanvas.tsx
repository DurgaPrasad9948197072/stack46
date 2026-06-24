'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000)
    camera.position.z = 5

    // Materials
    const matIco = new THREE.MeshBasicMaterial({ color: 0x2aace2, wireframe: true, transparent: true, opacity: 0.18 })
    const matTorus = new THREE.MeshBasicMaterial({ color: 0x4dd0c4, wireframe: true, transparent: true, opacity: 0.14 })
    const matIco2 = new THREE.MeshBasicMaterial({ color: 0x1e2a78, wireframe: true, transparent: true, opacity: 0.22 })

    // Shapes
    const ico1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), matIco)
    ico1.position.set(1.8, 0.6, -1.5)
    scene.add(ico1)

    const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.65, 1), matIco2)
    ico2.position.set(-2.2, -0.8, -2)
    scene.add(ico2)

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(0.7, 0.22, 80, 16), matTorus)
    torus.position.set(-1.4, 1.0, -2.5)
    scene.add(torus)

    const ico3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), matIco)
    ico3.position.set(2.4, -1.2, -1)
    scene.add(ico3)

    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.12, 8, 24), matIco2)
    torus2.position.set(0.4, 1.6, -3)
    scene.add(torus2)

    const onResize = () => {
      if (!mount) return
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const t = Date.now() * 0.0005
      ico1.rotation.x = t * 0.4
      ico1.rotation.y = t * 0.3
      ico2.rotation.x = -t * 0.25
      ico2.rotation.z = t * 0.2
      torus.rotation.x = t * 0.35
      torus.rotation.y = t * 0.25
      ico3.rotation.y = t * 0.5
      ico3.rotation.z = t * 0.2
      torus2.rotation.x = t * 0.3
      torus2.rotation.y = -t * 0.4
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      matIco.dispose(); matTorus.dispose(); matIco2.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
